interface Post {
    post: string;
    image: string;
}

interface Data {
    name: string;
    pages: Post[];
}

interface PostcardProps {
    data: Data
}

export function Postcard({data}: PostcardProps) {
    console.log(data)
    return (
        <>

        </>
    )
}