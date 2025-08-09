export default function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
        });
      }
      next(error);
    }
  };
}
