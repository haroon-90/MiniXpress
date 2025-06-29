import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'
import { motion } from "framer-motion"
import QuizInput from '../parts/QuizInput';
import QuizCard from '../parts/QuizCard';
import Results from '../parts/Results';
import Spinner from '../parts/Spinner';

function App() {
    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"
    const apiKey = "AIzaSyAp1Zebu2JWNd5obad4XgD63WUFf1J9Wpk";

    const [topic, setTopic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);

    const generateQuiz = async (userInput) => {
        if (!userInput) {
            alert("Please enter a topic to generate a quiz.");
            return;
        }

        if (!apiKey) {
            setError("API Key is not configured");
            return;
        }

        setIsLoading(true);
        setQuestions([]);
        setTopic(userInput);
        setIsSubmitted(false);
        setUserAnswers({});
        setScore(0);
        setError(null);

        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: `Response in json object form and don't add any other data in your response and create 15 different MCQs on the given topic in the format just like as:
                           [{ question: "Question 1?", a: "option 1", b: "option 2", c: "option 3", d: "option 4", correct: "a" }, {question: "Question 2?", a: "option 1", b: "option 2", c: "option 3", d: "option 4", correct: "c" }]
                           The topic is : ${userInput}`
                }]
            }]
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || `API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const rawText = data?.candidates[0]?.content?.parts[0]?.text;

            if (!rawText) {
                throw new Error("The API returned an empty response. The topic may be too restrictive.");
            }

            const cleanJsonString = rawText.trim().replace(/^```json\s*|```$/g, '');

            setQuestions(JSON.parse(cleanJsonString));

        } catch (err) {
            console.error("An error occurred:", err);
            setError(`Sorry, an error occurred: ${err.message}. Please check your API key and network connection.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswerChange = (index, value) => {
        setUserAnswers({ ...userAnswers, [index]: value });
    };

    const handleSubmit = () => {
        let currentScore = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correct) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setTopic("");
        setQuestions([]);
        setUserAnswers({});
        setIsSubmitted(false);
        setScore(0);
        setError(null);
    };

    return (
        <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <div className={`bg-blue-800/20 backdrop-blur-[2px] my-5 rounded-lg font-sans p-4 sm:p-6 lg:p-8`}>
                <div className={`max-w-4xl mx-auto ${isDark ? "bg-[#0f1056]" : "bg-[#E8F9FF]"} rounded-xl shadow-lg p-6`}>
                    <header className="flex justify-center items-center border-b border-gray-200 pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-[#FFA500]">QuickQuiz</h1>
                    </header>
                    <main>
                        {error && (
                            <div className="text-center p-4 my-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
                                <p>{error}</p>
                                <button onClick={handleRetry} className="mt-2 text-sm font-bold text-red-800">TRY AGAIN</button>
                            </div>
                        )}

                        {!topic && !isLoading && !error && <QuizInput onGenerate={generateQuiz} />}

                        {isLoading && <Spinner />}

                        {questions.length > 0 && !error && (
                            <div>
                                <h2 className="text-center text-2xl font-semibold mb-6">
                                    Topic: {topic}
                                </h2>
                                {questions.map((q, index) => (
                                    <QuizCard
                                        key={index}
                                        questionData={q}
                                        questionIndex={index}
                                        userAnswer={userAnswers[index]}
                                        isSubmitted={isSubmitted}
                                        onAnswerChange={handleAnswerChange}
                                    />
                                ))}

                                {!isSubmitted && questions.length > 0 && (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full sm:w-1/2 block mx-auto mt-6 text-black bg-[#FFA500] font-bold py-3 px-6 rounded-lg hover:bg-[#ffa600de] transition-colors disabled:bg-gray-400"
                                    >
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        )}

                        {isSubmitted && !error && (
                            <Results
                                score={score}
                                totalQuestions={questions.length}
                                onRetry={handleRetry}
                            />
                        )}
                    </main>
                </div>
            </div>
        </motion.div>
    );
}

export default App;