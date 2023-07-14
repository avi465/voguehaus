import * as yup from "yup";

const LoginSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(),
    age: yup
        .number()
        .required()
        .positive()
        .integer(),
    website: yup
        .string()
        .url()
});

const RegisterSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(),
    age: yup
        .number()
        .required()
        .positive()
        .integer(),
    website: yup
        .string()
        .url()
});

const AddProductSchema = yup.object().shape({
    images: yup
        .mixed()
        .required('Please upload at least one image.'),
    name: yup
        .string()
        .required("Name is required dont't you think? -_-"),
    slug: yup
        .string()
        .required('Slug is required'),
    price: yup
        .number()
        .required('Price is required')
        .typeError('Price must be a valid number'),
    discount: yup
        .number()
        .integer()
        .positive()
        .notRequired()
        .typeError('Discount must be a valid number'),
    stock: yup
        .number()
        .integer()
        .positive()
        .required('Stock is required')
        .typeError('Stock must be a valid number'),
    brand: yup
        .string()
        .required('Brand is required'),
    category: yup
        .string()
        .required('Category is required'),
    color: yup
        .string()
        .required('Color is required'),
    size: yup
        .string()
        .required('Size is required'),
    material: yup
        .string(),
    description: yup
        .string()
        .required('Description is required'),
    details: yup
        .string()
        .required('Details is required'),
});


const EditProductSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(),
    age: yup
        .number()
        .required()
        .positive()
        .integer(),
    website: yup
        .string()
        .url()
});

const AddCategorySchema = yup.object().shape({
    firstName: yup
        .string()
        .required(),
    age: yup
        .number()
        .required()
        .positive()
        .integer(),
    website: yup
        .string()

        .url()
});

export { LoginSchema, RegisterSchema, AddProductSchema, EditProductSchema, AddCategorySchema };