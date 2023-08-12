def generate_sql(tagged_query):
    select_clause = "SELECT "
    from_clause = "FROM " 
    where_clause = "WHERE "
    val = {}
    select = ""
    From = ""
    where = ""
    join_clause = ""
    
    for token in tagged_query:
        # if token[1] == "ATTR" or token[1] == "ATTRREF":
        #     select += token[2]
        if token[1] == "TABLE" or token[1] == "TABLEREF":
            From += token[2] + " "
        if token[1] == "ATTR" or token[1] == "ATTRREF":
            select += token[2] + " "
        if token[1] == "VALUE":
            if token[2] not in val:
                val[token[2]] = ""
            val[token[2]]+=token[0]+" "

    for key in val:
        where += key + " = " + val[key]
    
    sql_query = ""
    
    if select != "":
        sql_query += select_clause + select
    else :
        sql_query += select_clause + "* "
    
    if From != "":
        sql_query += " " + from_clause + From
    
    if join_clause != "":
        sql_query += " " + join_clause
    
    if where != "":
        sql_query += " " + where_clause + where
        
    return sql_query

tagged_queries = []

file = open("Results/Evaluation/Test_Triplets.txt", "r")
for line in file:
    tagged_queries.append(line)

for query in tagged_queries:
    print(generate_sql(query))