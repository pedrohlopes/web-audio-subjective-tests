import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';

export default function Question({ question, questionIndex, testResults, setTestResults }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);

    useEffect(() => {
        // Reset selectedOptions when question changes
        setSelectedOptions(Array(question.testSignals.length).fill(""));
    }, [question]);

    useEffect(() => {
        // Check if all audio signals are tested
        const allAudioTested = selectedOptions.length === question.testSignals.length && selectedOptions.every(option => option !== "");
        setSubmitEnabled(allAudioTested);
    }, [selectedOptions, question.testSignals.length]);

    const handleOptionClick = (option, audioIndex) => {
        let newSelectedOptions = [...selectedOptions];
        newSelectedOptions[audioIndex] = option;
        console.log(newSelectedOptions);
        setSelectedOptions(newSelectedOptions);
    };

    const handleAnswer = () => {
        const updatedTestResults = [...testResults];
        updatedTestResults[questionIndex] = {
            answers: selectedOptions,
            questionName: question.name,
            questionId: question.id,
            labels: question.scale.labels,
        };
        setTestResults(updatedTestResults);
        setSelectedOptions(Array(question.testSignals.length).fill(""));
        setSubmitEnabled(false);
    };

    return (
        <div>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
            <ul>
                {question.testSignals.map((audioPath, audioIndex) => (
                    <div className='flex flex-row items-center justify-center gap-4 text-center' key={`div_${audioIndex}`}>
                        <audio controls src={audioPath} key={audioIndex} />
                        {question.scale.labels.map((option, optionIndex) => (
                            <li key={audioIndex + '_' + optionIndex}>
                                <input
                                    type="radio"
                                    name={`question-${audioIndex + '_' + questionIndex}`}
                                    checked={selectedOptions[audioIndex] === option}
                                    onChange={() => handleOptionClick(option, audioIndex)}
                                />
                                {option}
                            </li>
                        ))}
                    </div>
                ))}
            </ul>

            <Button color='blue' onClick={handleAnswer} disabled={!submitEnabled}>Submit</Button>
        </div>
    );
}