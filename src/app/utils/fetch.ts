import qs from "qs"; 
import { cookies } from "next/headers"; 
interface FetchResponse<T> {
    data: T | null;
    status?: number;
    error?: {}; 
}

export const fetchApi = async <T>(
    path: string,
    options: RequestInit = {
        method: "GET",
    },
    populate?: any,
    filters?: any,
): Promise<FetchResponse<T>> => {
    let headers: {}; 
    const cookie = await cookies();
    const accessToken = cookie.get("access_token")?.value || ""; 
    console.log(accessToken)
    if (accessToken) {
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
    } else {
        headers = {
            "Content-Type": "application/json",
        };
    }

    let url: string;
    if (populate) {
        let queryParams: any = { populate };
        if (filters) {
            queryParams.filters = filters; 
        }
        const newUrl = new URL(path, process.env.API_URL); // Fixing the use of the 'part' variable
        newUrl.search = qs.stringify(queryParams); // Fixing query parameter serialization
        url = newUrl.toString();   
    } else {
        url = `${process.env.API_URL}${path}`; 
    }

    try {
        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            const errorResponse = await response.json();
            let errorData = null;

            try {
                const parsedError = JSON.parse(errorResponse.value);
                errorData = parsedError.error || parsedError;
            } catch (parseError) {
                errorData = errorResponse;
            }

            return { data: null, error: errorData }; 
        }

        const result = await response.json();
        return {
            data: result,
            status: response.status,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { data: null, status: 500, error: error.message };
        }
        return { data: null, status: 500, error: "Unknown error" };
    }
};
