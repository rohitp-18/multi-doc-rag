from langchain.chat_models import init_chat_model
from langchain.agents import create_agent
from pydantic import BaseModel
from pydantic.dataclasses import dataclass

spell_agent = None
chat_model = None



class SpellCheckRequest(BaseModel):
    text: str

@dataclass
class SpellCheckResponse:
    corrected_text: str
    score: float
    suggestions: list[str]

def spell_check_agent():
  global spell_agent
  global chat_model
  if spell_agent is not None:
    return spell_agent
  chat_model = init_chat_model(
    "google_genai:gemini-3.5-flash-lite",
    temperature=0.5,
    max_tokens=1000,
    timeout=30,
  )
  spell_agent = create_agent(
    model=chat_model,
    response_format=SpellCheckResponse
  )
  return spell_agent