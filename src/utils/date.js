export const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    //exemplo para formatar data:https://medium.com/swlh/use-tolocaledatestring-to-format-javascript-dates-2959108ea020
    const formatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("pt-BR", formatOptions);
};