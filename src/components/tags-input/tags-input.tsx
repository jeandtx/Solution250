import { useState } from 'react';

export interface FormCardProps {
    myTags: any;
}

function TagsInput({ myTags }: FormCardProps) {
    const [tags, setTags]: any = useState(myTags ?? []);

    function handleKeyDown(e: any) {
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = '';
    }

    function removeTag(index: any) {
        setTags(tags.filter((el: any, i: any) => i !== index));
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag: any, index: any) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>
                        &times;
                    </span>
                </div>
            ))}
            <input
                onKeyDown={handleKeyDown}
                type="text"
                className="tags-input"
                placeholder="Type somthing"
            />
        </div>
    );
}

export default TagsInput;
