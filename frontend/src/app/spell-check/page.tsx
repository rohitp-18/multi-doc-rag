"use client";

import AuthProvider from "@/components/authProvider";
import axios from "@/store/axios";
import { RootState } from "@/store/store";
import { isAxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function Page() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    correctedText: string;
    score: number;
    suggestions: string[];
    message: string;
  } | null>(null);

  const { user } = useSelector((state: RootState) => state.user);

  const handleSpellCheck = useCallback(async () => {
    if (!text.trim()) {
      return;
    }

    try {
      const { data } = await axios.post("/spell/spell-check", { text });
      const { correctedText, message } = data;
      setResult({ ...data, correctedText, message });
      toast.success(message || "Spell check completed successfully.");
    } catch (error) {
      const message = "Failed to perform spell check. Please try again.";
      if (error instanceof Error) {
        toast.error(`${message} Error: ${error.message}`);
      } else if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || message);
      } else {
        toast.error(message);
      }
    }
  }, [text]);

  if (!user)
    return (
      <AuthProvider redirect="/login">
        <></>
      </AuthProvider>
    );
  return (
    <AuthProvider>
      <section>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold mb-4">Spell Check</h1>
          <p className="text-lg text-gray-600 mb-8">
            Enter text below to check for spelling errors.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full max-w-lg p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
            placeholder="Type your text here..."
          ></textarea>
          <button
            onClick={handleSpellCheck}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Check Spelling
          </button>
        </div>
        {/* result */}
        {result && (
          <div className="mt-8 p-4 border border-gray-300 rounded-md shadow-sm max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Spell Check Result</h2>
            <p className="mb-2">
              <strong>Message:</strong> {result.message}
            </p>
            <p className="mb-2">
              <strong>Corrected Text:</strong> {result.correctedText}
            </p>
            <p className="mb-2">
              <strong>Score:</strong> {result.score}
            </p>
            <p className="mb-2">
              <strong>Suggestions:</strong>{" "}
              {result.suggestions.length > 0
                ? result.suggestions.join(", ")
                : "No suggestions available."}
            </p>
          </div>
        )}
      </section>
    </AuthProvider>
  );
}

export default Page;
