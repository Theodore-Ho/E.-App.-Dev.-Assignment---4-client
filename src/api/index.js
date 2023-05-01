import request from "@/utils/request";

export default {
    getProductsByPage(page, limit, filter) {
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
    getCategoryOption(query) {
        return request({
            url: "/categories",
            method: "get",
            params: {
                q: query
            }
        })
    }
}