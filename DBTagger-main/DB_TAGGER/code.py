import os
from nltk.tag import StanfordPOSTagger
from to_sql import generate_sql

# Set the path to the tagger and model files

stanford_dir = 'stanford-postagger-full-2020-11-17'
modelfile = stanford_dir + '/models/english-left3words-distsim.tagger'
jarfile = stanford_dir + '/stanford-postagger.jar'

# Initialize the tagger
tagger = StanfordPOSTagger(modelfile, jarfile)

_sentences = []
_tags = []
_dbtags = []

def query_to_postag(sentence):
    # Take input sentence from user
    # sentence = input("Enter an English sentence: ")

    # Tag the sentence
    tagged_words = tagger.tag(sentence.split())

    # Join the tagged words into a string with the specified format
    tagged_sentence = ' '.join([f"{word}/{tag}/" for word, tag in tagged_words])

    # Print the tagged sentence
    return tagged_sentence + '\n'

def query_to_tag(sentence):
    sentence = sentence.split()
    tagged_sentence = ' '.join([f"{word}/O/" for word in sentence])
    return tagged_sentence + '\n'

# Create a file to write the tagged sentence to
testtokens = open('Results/Evaluation/'+ 'Test_' + 'testToken' + '.txt' , "w")
testpos = open('FixedDataset/' + 'Test_' + 'TestPos.txt', "w")
testtag = open('FixedDataset/' + 'Test_' + 'TestTag.txt', "w")
testdbtag = open('FixedDataset/' + 'Test_' + 'TestDBTag.txt', "w")

# Given column names and table name:
table_name = "actors"
column_names = ["name", "movie", "birthdates", "place", "nationality"]
# "composer", "editor", "producer", "production_company", "distributor", "budget", "gross", "runtime", "country", "language"]

global_query = "Find " + column_names[0]
for i in range(1, len(column_names)):
    global_query += " , "
    global_query += column_names[i]

global_query += " from " + table_name

testtokens.write(global_query)
testpos.write(query_to_postag(global_query))
testtag.write(query_to_tag(global_query))
testdbtag.write(query_to_tag(global_query))
_sentences.append(global_query)

while(1):
    input_query = input("Enter your query: ")
    if input_query == "exit":
        testtokens.close()
        testpos.close()
        testtag.close()
        testdbtag.close()
        break
    testtokens.write(input_query)
    testpos.write(query_to_postag(input_query))
    testtag.write(query_to_tag(input_query))
    testdbtag.write(query_to_tag(input_query))
    _sentences.append(input_query)











import sys
#home = str(Path.home())
os.environ ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ ["CUDA_VISIBLE_DEVICES"] = sys.argv[2]

import numpy as np
from sklearn.model_selection import train_test_split
from keras.preprocessing.sequence import pad_sequences
from keras import Input, Model
from keras.models import Sequential
from keras.layers import Dense, LSTM, Bidirectional, TimeDistributed, Embedding, Activation, Reshape, Lambda, concatenate, RepeatVector, GRU
from keras.optimizers import Adam, Adadelta, Nadam
from keras import backend as K
from keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from keras.models import load_model
from keras.utils import plot_model
from pathlib import Path
from util import *
from NEpochLogger import *
from ChainCRF import *
from seqeval.metrics import f1_score, accuracy_score, precision_score, recall_score
import tensorflow as tf
from keras.backend.tensorflow_backend import set_session
from sklearn.model_selection import KFold, StratifiedKFold
import pickle

config = tf.ConfigProto()
config.gpu_options.allow_growth = True  # dynamically grow the memory used on the GPU
config.log_device_placement = True  # to log device placement (on which device the operation ran)
                                    # (nothing gets printed in Jupyter, only if you run it standalone)
sess = tf.Session(config=config)
set_session(sess)  # set this TensorFlow session as the default session for Keras


schema = sys.argv[1]


train_sentences, train_pos_tags = retrieve_data_and_tag('FixedDataset/' + schema + 'TrainPos.txt')
_, train_tags = retrieve_data_and_tag('FixedDataset/' + schema + 'TrainTag.txt')
_, train_db_tags = retrieve_data_and_tag('FixedDataset/' + schema + 'TrainDbTag.txt')

test_sentences, test_pos_tags = retrieve_data_and_tag('FixedDataset/' + 'Test_' + 'TestPos.txt')
_, test_tags = retrieve_data_and_tag('FixedDataset/' + 'Test_' + 'TestTag.txt')
_, test_db_tags = retrieve_data_and_tag('FixedDataset/' + 'Test_' + 'TestDBTag.txt')

#print(test_sentences)

all_pos_tags = []
all_pos_tags.extend(train_pos_tags)
# all_pos_tags.extend(test_pos_tags)

all_tags = []
all_tags.extend(train_tags)
# all_tags.extend(test_tags)

all_db_tags = []
all_db_tags.extend(train_db_tags)
# all_db_tags.extend(test_db_tags)

all_sentences = train_sentences
#in evaluation only test sentences will be used all data is retrieved just for indexing purposes
words, tags, db_tags, pos_tags = set([]), set([]), set([]), set([])

for ts in all_pos_tags:
    for t in ts:
        pos_tags.add(t)

for ts in all_tags:
    for t in ts:
        tags.add(t)

for ts in all_db_tags:
    for t in ts:
        db_tags.add(t)

word2embedding = load_vectors('Embeddings/tokens.vec')

tag2index = {t: i + 1 for i, t in enumerate(sorted(tags))}
tag2index['-PAD-'] = 0  # The special value used to padding

dbtag2index = {t: i + 1 for i, t in enumerate(sorted(db_tags))}
dbtag2index['-PAD-'] = 0  # The special value used to padding

postag2index = {t: i + 1 for i, t in enumerate(sorted(pos_tags))}
postag2index['-PAD-'] = 0  # The special value used to padding

#converting words and tags to indexes
test_sentences_X = []

#create input vectors using word representations
for idx, s in enumerate(test_sentences):
    s_int = []
    for w in s:
        try:
            word_vector = word2embedding[w]
            s_int.append(word_vector)
        except KeyError:
            print('Key error:',w ,'what is this:', s)

    test_sentences_X.append(s_int)

#lenght of the longest sentence
MAX_LENGTH = len(max(all_sentences, key=len))
print("Schema is " + schema)

test_sentences_X = post_pad_sequence_list(test_sentences_X, MAX_LENGTH) #pad input first

#convert sentence embeddings to np.array
test_sentences_array = np.array(test_sentences_X)

#print(test_sentences_array)

dropout = 0.0

# LSTM Model - update: converted to a GRU model (layer variable names didn't get updated)
K.clear_session()
# network model

input_layer = Input((MAX_LENGTH, test_sentences_array.shape[2]))
output_of_LSTM = Bidirectional(GRU(100, dropout=dropout, recurrent_dropout=dropout, return_sequences=True, unroll=True))(input_layer) #shared bi-lstm
output_of_LSTM_pos_tag = GRU(100, dropout=dropout, recurrent_dropout=dropout, return_sequences=True,
                             unroll=True)(output_of_LSTM) #unshared lstm for pos
output_of_time_distributed_pos_tag = TimeDistributed(Dense(len(postag2index)))(output_of_LSTM_pos_tag)

output_of_LSTM_tag = GRU(100, dropout=dropout, recurrent_dropout=dropout, return_sequences=True,
                         unroll=True)(output_of_LSTM)
input_to_tag_dist = concatenate([output_of_LSTM_tag, output_of_time_distributed_pos_tag], axis=2)
output_of_time_distributed_tag = TimeDistributed(Dense(len(tag2index)))(input_to_tag_dist)

output_of_LSTM_db_tag = GRU(100, dropout=dropout, recurrent_dropout=dropout,
                            return_sequences=True, unroll=True)(output_of_LSTM)
input_to_db_tag_dist = concatenate([output_of_LSTM_db_tag, output_of_time_distributed_tag], axis=2)
output_of_time_distributed_db_tag = TimeDistributed(Dense(len(dbtag2index)))(input_to_db_tag_dist)


crf_tag = ChainCRF(name=sys.argv[1] + 'type_crf')
output_layer_tag = crf_tag(output_of_time_distributed_tag)

crf_db_tag = ChainCRF(name=sys.argv[1] + 'db_crf')
output_layer_db_tag = crf_db_tag(output_of_time_distributed_db_tag)

crf_pos_tag = ChainCRF(name=sys.argv[1] + 'pos_crf')
output_layer_pos_tag = crf_pos_tag(output_of_time_distributed_pos_tag)
model = Model(input_layer, [output_layer_tag, output_layer_db_tag, output_layer_pos_tag])    

model.compile(loss=[crf_tag.loss, crf_db_tag.loss, crf_pos_tag.loss], optimizer=Adadelta(clipnorm=1.),
                metrics=['accuracy', ignore_class_accuracy(0)])

model.summary()
model.load_weights('Models/' + schema + '.h5')

#pickle.dump(model, open('model.pkl', 'wb'))

predicted = model.predict(test_sentences_array)

#first get prediction for type tags
predictedtags = logits_to_tokens(predicted[0], {i: t for t, i in tag2index.items()})
predicted_tags = []
for i, sequence in enumerate(predictedtags):
    predicted_tags.append(sequence[:len(test_tags[i])])

#then get prediction for db tags
predicteddbtags = logits_to_tokens(predicted[1], {i: t for t, i in dbtag2index.items()})
predicted_db_tags = []
for i, sequence in enumerate(predicteddbtags):
    predicted_db_tags.append(sequence[:len(test_db_tags[i])])

#print(predicted_tags)

with open('Results/Evaluation/'+ 'Test_' + 'dbTags' + '.txt', 'w') as f:
    for prediction in predicted_db_tags:
        pred = ' '.join(prediction)
        _dbtags.append(pred)
        #print(pred, file=f)

with open('Results/Evaluation/'+ 'Test_' + 'testTags' + '.txt', 'w') as f:
    for prediction in predicted_tags:
        pred = ' '.join(prediction)
        _tags.append(pred)
        #print(pred, file=f)

l = len(_sentences)

with open('Results/Evaluation/'+ 'Test_' + 'Triplets' + '.txt', 'w') as f:
    ls = []
    x = _sentences[0].split()
    y = _tags[0].split()
    z = _dbtags[0].split()
    
    mapping = {}
    
    for j in range (len(x)):
        mapping[z[j]] = x[j]
    
    for i in range(1,l):
        ls1 = []
        x = _sentences[i].split()
        y = _tags[i].split()
        z = _dbtags[i].split()
        
        for j in range(len(x)):
            if z[j] != 'O' and z[j] in mapping.keys() :
                ls1.append((x[j],y[j],mapping[z[j]]))
            else:
                ls1.append((x[j],y[j],z[j]))
        ls.append(ls1)
        print(ls1)
        #print(generate_sql(ls1))
        
    #print(ls)
    
    
    
    
