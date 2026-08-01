from app.schema.spell_schema import SpellCheckOut
from app.config.spell_agent import spell_check_agent
from langchain.messages import SystemMessage, HumanMessage

system_prompt ="""
You are a helpful assistant that corrects spelling errors in the provided text. Please return the corrected text without any additional explanations or comments. If the text is already correct, simply return it as is. 
Provide a concise and accurate answer.
"""



def spell_check(text: str):
    agent = spell_check_agent()

    response =  agent.invoke({
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
            ]})

    print("Spell check response:", response["structured_response"].score)
    return {
        "corrected_text": response['structured_response'].corrected_text,
        "score": response['structured_response'].score,
        "suggestions": response['structured_response'].suggestions,
    }
    
