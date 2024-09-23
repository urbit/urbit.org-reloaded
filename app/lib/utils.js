
export const hello = (date) => {
  return 'hello world' + date;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return isNaN(date) ? dateString : date.toLocaleDateString();
}

export const formatAuthors = (authors) => {
  let authorList = '';

  authors?.forEach((author, index) => {
    index === 0 ? authorList += 'By ' : null;
    authorList += author.name;
    if (index < authors.length - 2) {
      authorList += ', ';
    }
    if (index === authors.length - 2) {
      authorList += ' and ';
    }
  });

  return authorList;
}