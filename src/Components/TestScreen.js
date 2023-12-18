import Question from "./Question";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import writeCSV  from "../utils/writeCSV";

export default function TestScreen({questions}) {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [testResults, setTestResults] = useState(Array(questions.length));
    const [testComplete, setTestComplete] = useState(false);


    useEffect(() => {
        if (testResults[0]){
            if (currentQuestion < questions.length - 1){
                setCurrentQuestion(currentQuestion+1);
            }
            else{
                console.log(testResults);
                setTestComplete(true)
            }
        }

    }, [testResults]);




    useEffect(()=> {
        if (testComplete){
            writeCSV(testResults)
        }
        
    }, [testComplete])


    return (
        <Card className="flex justify-center items-center gap-4 p-8 max-w-[80%]">
        {
            testComplete? <h1>Test Complete</h1>: 
            
                <>
                    <Question question={questions[currentQuestion]}
                        questionIndex={currentQuestion}
                        setQuestionIndex={setCurrentQuestion}
                        testResults={testResults}
                        setTestResults={setTestResults}
                    />
                </>
            
        }
        </Card>
    );
}