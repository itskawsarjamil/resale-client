import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        document.title = title + '-Resale';
    }, [title]);
}

export default useTitle;