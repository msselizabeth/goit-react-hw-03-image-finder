const KEY = '34524766-407a4658e34aba55fff82f465';

// export const getImages = (searchImageName, page) => {
//   return fetch(`https://pixabay.com/api/?q=${searchImageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
// }

export const getImages = async (imageName, page) => {
  return fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
};