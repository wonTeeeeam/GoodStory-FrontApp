export const sortByCreatedDate = (list: any[]) => {
  list.sort(function (a, b) {
    const aTime = new Date(a.Created_date).getTime();
    const bTime = new Date(b.Created_date).getTime();
    return aTime - bTime;
  });
};
