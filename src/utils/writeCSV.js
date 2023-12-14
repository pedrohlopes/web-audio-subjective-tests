const writeCSV = (testResults) => {
    const csvContent = "data:text/csv;charset=utf-8," + "QuestionId;QuestionName;QuestionAnswers\n" +testResults.map(questionResults =>
         `${questionResults.questionId};${questionResults.answers.toString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "answers.csv");
    document.body.appendChild(link);
    link.click();
}

export default writeCSV;