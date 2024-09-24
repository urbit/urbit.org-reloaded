
export const hello = (date) => {
  return 'hello world' + date;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return isNaN(date) ? dateString : date.toLocaleDateString(undefined, options);
}

export const formatAuthors = (authors) => {
  let authorList = '';

  authors?.forEach((author, index) => {
    index === 0 ? authorList += '' : null;
    authorList += author.name;
    if (index < authors.length - 1) {
      authorList += ', ';
    }
  });

  return authorList;
}