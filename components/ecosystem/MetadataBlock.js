export default function MetadataBlock({ title, content }) {
    return <div className="flex flex-col py-2 basis-1/2">
        <p className="font-bold text-wall-400">{title}</p>
        <p>{content}</p>
    </div>

}