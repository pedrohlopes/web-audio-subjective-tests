import ScaleBlock from "./ScaleBlock"


export default function AudioTestBlock({ question, audioPath, audioIndex, questionIndex, selectedOptions, handleOptionClick }){
    


    const showScale = audioIndex!=('reference')&&audioIndex!=('reference2')  || (question.hiddenReference) || question.referenceEvaluated
    
    
    return (
        <div className='flex flex-col mb-8'>
        <h2 className='mb-2 self-start'>{question.prompts[audioIndex]}</h2>
        <div className='flex flex-row items-center justify-center gap-4 text-center' key={`div_${audioIndex}`}>
            <audio controls src={audioPath} key={audioIndex} className="flex flex-grow"/>
            {showScale &&
             
                <ScaleBlock
                    key={audioIndex + '_scale_block_'}
                    question={question}
                    handleOptionSelect={handleOptionClick}
                    audioIndex={audioIndex}
                    questionIndex={questionIndex}
                    selectedOptions={selectedOptions}
                />
            }
        </div>
    </div>
    )
}