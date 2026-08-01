from fastapi import APIRouter, Depends, HTTPException, status
from app.schema.spell_schema import SpellCheckIn, SpellCheckOut
from app.lanchain.spell_check import spell_check


router = APIRouter()

@router.post("/check")
def check_spelling(request: SpellCheckIn):
    try:
      res = spell_check(request.text)
      return res
    except Exception as e:
        print("Error in spell check:", e)
        return HTTPException(status_code=500, detail=str(e))