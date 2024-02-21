import { Select, Option } from "@material-tailwind/react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value) {
    return `${value}`;
  }

export default function ScaleBlock({question, handleOptionSelect, audioIndex, questionIndex, selectedOptions}) {
    if (question.scale.type === 'discrete') {
        return (
            <>
                {question.scale.labels.map((option, optionIndex) => (
                    <li key={audioIndex + '_' + optionIndex}>
                        <input className='mr-1'
                            type="radio"
                            name={`question-${audioIndex + '_' + questionIndex}`}
                            checked={selectedOptions[audioIndex] === option}
                            onChange={() => handleOptionSelect(option, audioIndex)}
                        />
                        {option}
                    </li>
                ))}
            </>
        )
    }
    if (question.scale.type === 'dropdown') {
        return (
            <div className="w-[200px]">
                <Select
                    label="Select"
                    value={selectedOptions[audioIndex]}
                    onChange={(e) => handleOptionSelect(e, audioIndex)}
                    size='md'
                    className="text-left items-start content-start"
                >
                    {question.scale.labels.map((option, optionIndex) => (
                        <Option className="text-left" key={audioIndex + '_' + optionIndex} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </div>
        )
    }
    if (question.scale.type === 'continuous'){
        const marks = question.scale.labels.map((label, index) => {
            return {
                value: question.scale.values[index],
                label: label
            }
        })

        return (
        <Box className='flex flex-row' sx={{ width: 500, paddingX:5, wordWrap:"break-word" }}>

            <p className="mr-2 translate-y-8">{question.scale.borderLabels? question.scale.borderLabels[0]: null}</p>
            <Slider
    
              aria-label="Temperature"
              defaultValue={(question.scale.range[1]+question.scale.range[0])/2}
            //   value={selectedOptions[audioIndex]}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(e) =>{console.log(e); handleOptionSelect(e.target.value, audioIndex)}}
              //color={selectedOptions[audioIndex] && selectedOptions[audioIndex] !== '' ? 'primary':'gray'}
              sx={{color: selectedOptions[audioIndex] && selectedOptions[audioIndex] !== '' ? 'primary':'gray'}}
              min={question.scale.range[0]}
              max={question.scale.range[1]}
            />
            <p className="mr-2 translate-y-8">{question.scale.borderLabels? question.scale.borderLabels[1]: null}</p>
          </Box>
          
        )
    }

    return <p>Error! scale type not supported</p>
}
