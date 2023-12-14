export default function AudioTestBlock({ question, audioPath, audioIndex, questionIndex, selectedOptions, handleOptionClick }){
    
    let AnchorReferenceLabel = ''
    if (!question.hiddenReference && typeof(audioIndex) === 'string') {
        AnchorReferenceLabel = audioIndex==='reference' ? ' (Reference)' : ' (Anchor)'
    }

    return (
        <div className='flex flex-col mb-8'>
        <h2 className='mb-2 self-start'>{question.prompt + AnchorReferenceLabel}</h2>
        <div className='flex flex-row items-center justify-center gap-4 text-center' key={`div_${audioIndex}`}>
            <audio controls src={audioPath} key={audioIndex} />
            {question.scale.labels.map((option, optionIndex) => (
                <li key={audioIndex + '_' + optionIndex}>
                    <input className='mr-1'
                        type="radio"
                        name={`question-${audioIndex + '_' + questionIndex}`}
                        checked={selectedOptions[audioIndex] === option}
                        onChange={() => handleOptionClick(option, audioIndex)}
                    />
                    {option}
                </li>
            ))}
        </div>
    </div>
    )
}