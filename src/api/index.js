import request from "@/utils/request";

export default {
    getProducts(page, limit, filter) {
        return request({
            url: "/products",
            method: "get",
            params: {
                page: page,
                limit: limit,
                categories: filter
            }
        })
    },
    getProductById(id) {
        return request({
            url: "/product",
            method: "get",
            params: {
                id: id
            }
        })
    },
    getCategoryOption(query) {
        return request({
            url: "/categories",
            method: "get",
            params: {
                q: query
            }
        })
    },
    insertNewProduct(product) {
        return request({
            url: "/product",
            method: "post",
            data: product
        })
    },
    deleteProductById(id) {
        return request({
            url: "/product",
            method: "delete",
            params: {
                id: id
            }
        })
    },
    editProductById(product) {
        return request({
            url: "/product",
            method: "put",
            data: product
        })
    }
}