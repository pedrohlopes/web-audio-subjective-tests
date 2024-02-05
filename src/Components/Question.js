import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import AudioTestBlock from './AudioTestBlock';
import { getRandomIndexes, shuffle, shuffleArrayByIndexes } from '../utils/general';

export default function Question({ question, questionIndex, testResults, setTestResults }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [audioTestBlocks, setAudioTestBlocks] = useState([]);
    const [randomIndexes, setRandomIndexes] = useState([]);


    useEffect(() => {
        // Reset selectedOptions when question changes
        let newSelectedOptions = Array(question.testSignals.length).fill("");
        newSelectedOptions['reference'] = "";
        newSelectedOptions['anchor'] = "";
        setSelectedOptions(Array(question.testSignals.length).fill(""));
        setRandomIndexes(getRandomIndexes(newSelectedOptions.concat(['reference', 'anchor'])))
    }, [question]);

    useEffect(() => {
        // Check if all audio signals are tested
        let allAudioTested = selectedOptions.length === question.testSignals.length && selectedOptions.every(option => option !== "");
        if (question.anchor && question.anchorEvaluated){
            allAudioTested = allAudioTested && selectedOptions['anchor']
        }
        if (question.reference && question.referenceEvaluated){
            allAudioTested = allAudioTested && selectedOptions['reference']
        }
        
        setSubmitEnabled(allAudioTested);
    }, [selectedOptions, question.testSignals]);

    useEffect(() => {
        let newAudioTestBlocks = [];
        //fill all audio test blocks
        if (question.reference){
            newAudioTestBlocks.push(
                <AudioTestBlock
                    key={'reference_block'} 
                    question={question}
                    audioPath={question.reference}
                    audioIndex={'reference'}
                    questionIndex={questionIndex}
                    selectedOptions={selectedOptions}
                    handleOptionClick={handleOptionClick}
                />
            );
        }  
        if (question.reference2){
            newAudioTestBlocks.push(
                <AudioTestBlock
                    key={'reference_block'} 
                    question={question}
                    audioPath={question.reference2}
                    audioIndex={'reference2'}
                    questionIndex={questionIndex}
                    selectedOptions={selectedOptions}
                    handleOptionClick={handleOptionClick}
                />
            );
            
        }
        question.testSignals.forEach((audioPath, audioIndex) => {

            newAudioTestBlocks.push(
                <AudioTestBlock
                    key={audioIndex} 
                    question={question}
                    audioPath={audioPath}
                    audioIndex={audioIndex}
                    questionIndex={questionIndex}
                    selectedOptions={selectedOptions}
                    handleOptionClick={handleOptionClick}
                />
            );
        });

        if (question.anchor){
            newAudioTestBlocks.push(
                <AudioTestBlock
                    key={'anchorblock'}  
                    question={question}
                    audioPath={question.anchor}
                    audioIndex={'anchor'}
                    questionIndex={questionIndex}
                    selectedOptions={selectedOptions}
                    handleOptionClick={handleOptionClick}
                />
            );
        }
                              
        setAudioTestBlocks(newAudioTestBlocks);
    }, [question, selectedOptions]);

    const handleOptionClick = (option, audioIndex) => {
        let newSelectedOptions = [...selectedOptions];
        newSelectedOptions['anchor'] = selectedOptions.anchor;
        newSelectedOptions['reference'] = selectedOptions.reference;
        newSelectedOptions[audioIndex] = option;
        console.log(newSelectedOptions)
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
            <h2 className='font-bold text-lg'>{question.name}</h2>
            
            <p className="whitespace-pre-line">{question.description}</p>
            <ul>
                {question.hiddenReference ? shuffleArrayByIndexes(audioTestBlocks,randomIndexes) : audioTestBlocks}
            </ul>
            <Button color='blue' onClick={handleAnswer} disabled={!submitEnabled}>Submit</Button>
        </div>
    );
}