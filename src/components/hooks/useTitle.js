import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        document.title = title + '-reSale';
    }, [title]);
}

export default useTitle;