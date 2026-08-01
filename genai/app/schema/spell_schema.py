from pydantic import BaseModel
from typing import List

class SpellCheckIn(BaseModel):
  text: str

class SpellCheckOut(BaseModel):
  corrected_text: str
  score: float
  suggestions: List[str]