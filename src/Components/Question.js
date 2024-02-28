import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import AudioTestBlock from './AudioTestBlock';
import { getRandomIndexes, shuffle, shuffleArrayByIndexes } from '../utils/general';

export default function Question({ question, questionIndex, testResults, setTestResults }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [audioTestBlocks, setAudioTestBlocks] = useState([]);



    useEffect(() => {
        // Reset selectedOptions when question changes
        let newSelectedOptions = Array(question.testSignals.length).fill("");
        question.references?.forEach((reference, referenceIndex) => {
            newSelectedOptions['reference' + referenceIndex] = "";
        }
        )
        question.anchors?.forEach((anchor, anchorIndex) => {
            newSelectedOptions['anchor' + anchorIndex] = "";
        }
        )
        setSelectedOptions(Array(question.testSignals.length).fill(""));
    }, [question]);

    useEffect(() => {
        // Check if all audio signals are tested
        let allAudioTested = selectedOptions.length === question.testSignals.length && selectedOptions.every(option => option !== "");
        if (question.anchors && question.anchorEvaluated){
            const anchorsEvaluated = question.anchors.map((anchor, anchorIndex) => {
                return selectedOptions['anchor' + anchorIndex]
            }).every(option => option && option !== "")
            allAudioTested = allAudioTested && anchorsEvaluated
        }
        if (question.references && question.referenceEvaluated){
            const referencesEvaluated = question.references.map((reference, referenceIndex) => {
                return selectedOptions['reference' + referenceIndex]
            }).every(option => option && option !== "")
            allAudioTested = allAudioTested && referencesEvaluated
        }
        
        setSubmitEnabled(allAudioTested);
    }, [selectedOptions, question.testSignals]);

    useEffect(() => {
        let newAudioTestBlocks = [];
        //fill all audio test blocks
        if (question.references?.length > 0){
            console.log('references present')
            question.references.forEach((reference, referenceIndex) => {
                newAudioTestBlocks.push(
                    <AudioTestBlock
                        key={'reference' + referenceIndex} 
                        question={question}
                        audioPath={reference}
                        audioIndex={'reference' + referenceIndex}
                        questionIndex={questionIndex}
                        selectedOptions={selectedOptions}
                        handleOptionClick={handleOptionClick}
                    />
                );
            });
        }
        let testSignalsBlocks = []  
        question.testSignals.forEach((audioPath, audioIndex) => {

            testSignalsBlocks.push(
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

        console.log(testSignalsBlocks)
        if (question.shuffleTestSignals){
            newAudioTestBlocks = newAudioTestBlocks.concat(
                shuffle(testSignalsBlocks)
            );
            console.log('shuffled')
            console.log(shuffle(testSignalsBlocks)) 
        } else {
            newAudioTestBlocks = newAudioTestBlocks.concat(testSignalsBlocks);
        }


        if (question.anchors?.length >0){
            console.log('anchors present')
            question.anchors.forEach((anchor, anchorIndex) => {
                newAudioTestBlocks.push(
                    <AudioTestBlock
                        key={'anchor' + anchorIndex}  
                        question={question}
                        audioPath={anchor}
                        audioIndex={'anchor' + anchorIndex}
                        questionIndex={questionIndex}
                        selectedOptions={selectedOptions}
                        handleOptionClick={handleOptionClick}
                    />
                );
            });
        }
                              
        setAudioTestBlocks(newAudioTestBlocks);
    }, [question, selectedOptions]);

    const handleOptionClick = (option, audioIndex) => {
        let newSelectedOptions = [...selectedOptions];
        question.references?.forEach((reference, referenceIndex) => {
            newSelectedOptions['reference' + referenceIndex] = selectedOptions['reference' + referenceIndex];
        }
        )
        question.anchors?.forEach((anchor, anchorIndex) => {
            newSelectedOptions['anchor' + anchorIndex] = selectedOptions['anchor' + anchorIndex];
        }
        )
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
        setAudioTestBlocks([]);
        setSubmitEnabled(false);
    };

    return (
        <div>
            <h2 className='font-bold text-lg'>{question.name}</h2>
            <p className="whitespace-pre-line">{question.description}</p>
            <ul>
                { audioTestBlocks}
            </ul>
            <Button color='blue' onClick={handleAnswer} disabled={!submitEnabled}>{question.submitButtonText}</Button>
        </div>
    );
}