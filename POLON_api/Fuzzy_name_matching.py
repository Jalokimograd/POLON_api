from fuzzywuzzy import fuzz

Str1 = ""
Str2 = ""
Ratio = fuzz.ratio(Str1.lower(),Str2.lower())
Partial_Ratio = fuzz.partial_ratio(Str1.lower(),Str2.lower())
Token_Sort_Ratio = fuzz.token_sort_ratio(Str1,Str2)
Token_Set_Ratio = fuzz.token_set_ratio(Str1,Str2)

print(Ratio)
print(Partial_Ratio)
print(Token_Sort_Ratio)
print(Token_Set_Ratio)

def get_similarity(Str1, Str2):
    Ratio = fuzz.ratio(Str1.lower(),Str2.lower())
    Partial_Ratio = fuzz.partial_ratio(Str1.lower(),Str2.lower())
    Token_Sort_Ratio = fuzz.token_sort_ratio(Str1,Str2)
    Token_Set_Ratio = fuzz.token_set_ratio(Str1,Str2)

    return(max(Ratio, Partial_Ratio, Token_Sort_Ratio, Token_Set_Ratio))
