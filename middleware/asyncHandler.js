/**
 * Funcion asincronica que recibe una funcion y retorna una promesa tipo try/catch
 * @param {*} fn
 * @returns Promise
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
