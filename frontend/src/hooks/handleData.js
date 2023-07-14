import apiClinet from '../utils/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query'

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
};

export const getProducts = async () => {
    try {
        const res = await apiClinet.get('/api/products');
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getProduct = async (id) => {
    try {
        const res = await apiClinet.get(`/api/products/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// export const createProduct = async (product) => {
//     try {
//         const res = await apiClinet.post('/api/products', product, config);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// }


// make a custom hook for data fetching
export const useCreateProduct = () => {
    const createProductMutation = useMutation((data) => {
        return apiClinet.post('/api/products', data, config);
    });

    const createProduct = async (data) => {
        try {
            await createProductMutation.mutateAsync(data);
            // Sucess
            console.log('Product created successfully');
        } catch (error) {
            // Handle login error
            console.error('Product creation error', error);
        }
    };
    return {
        createProduct,
        isLoading: createProductMutation.isLoading,
        error: createProductMutation.error,
        isSuccess: createProductMutation.isSuccess
    };
};