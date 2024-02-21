const writeCSV = (testResults) => {
    const csvContent = "data:text/csv;charset=utf-8," + "QuestionId;QuestionAnswers;AnchorAnswers;ReferenceAnswers\n" + 
    testResults.map(questionResults =>{
        const anchorKeys = Object.keys(questionResults.answers).filter(key => key.includes('anchor'))
        const referenceKeys = Object.keys(questionResults.answers).filter(key => key.includes('reference'))
        const anchorValues = anchorKeys.map(key => questionResults.answers[key]).filter(value => value).join(',')
        const referenceValues = referenceKeys.map(key => questionResults.answers[key]).filter(value => value).join(',')
        return `${questionResults.questionId};${questionResults.answers.toString()};${anchorValues? anchorValues: 'null'};${referenceValues? referenceValues: 'null'}`
        
    }).join("\n");
         
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "answers.csv");
    document.body.appendChild(link);
    link.click();
}

export default writeCSV;