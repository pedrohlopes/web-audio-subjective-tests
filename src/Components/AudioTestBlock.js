import ScaleBlock from "./ScaleBlock"


export default function AudioTestBlock({ question, audioPath, audioIndex, questionIndex, selectedOptions, handleOptionClick }){
    const isReference = typeof(audioIndex) === 'string' && audioIndex.includes('reference')
    const isAnchor = typeof(audioIndex) === 'string' && audioIndex.includes('anchor')
    let isEvaluated = true
    if (isReference && !question.referenceEvaluated){
        isEvaluated = false
    }
    if (isAnchor && !question.anchorEvaluated){
        isEvaluated = false
    }

    const showScale = !(isReference || isAnchor) || isEvaluated
    // Simple check: if audioPath looks like a URL or file path, treat as audio, else as text
    const isAudio = typeof audioPath === 'string' && (audioPath.endsWith('.mp3') || audioPath.endsWith('.wav') || audioPath.endsWith('.ogg') || audioPath.endsWith('.aac'))

    return (
        <div className='flex flex-col mb-8'>
            <h2 className='mb-2 self-start'>{question.prompts[audioIndex]}</h2>
            <div className='flex flex-row items-center justify-center gap-4 text-center' key={`div_${audioIndex}`}>
                {isAudio ? (
                    <audio controls src={audioPath} key={audioIndex} className="flex flex-grow"/>
                ) : (
                    <div className="flex flex-grow p-2 border rounded bg-gray-100 text-left">{audioPath}</div>
                )}
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