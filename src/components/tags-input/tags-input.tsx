import { useState } from 'react';
import styles from './tags-input.module.scss';

export interface FormCardProps {
    myTags: any;
    setMyTags: any;
}

function TagsInput({ myTags, setMyTags }: FormCardProps) {
    const [tags, setTags]: any = useState(myTags ?? []);

    function handleKeyDown(e: any) {
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        setMyTags([...tags, value]);
        e.target.value = '';
    }

    function removeTag(index: any) {
        setTags(tags.filter((el: any, i: any) => i !== index));
        setMyTags(tags.filter((el: any, i: any) => i !== index));
    }

    return (
        <div className={styles.tagContainer}>
            <input
                onKeyDown={handleKeyDown}
                type="text"
                className={styles.tagsInput}
                placeholder="Add a tag..."
            >
                
            </input>
            <div className={styles.mapContainer}>
                {tags.map((tag: any, index: any) => (
                    <div className={styles.tagCard} key={index}>
                        <span className={styles.tagText}>{tag}</span>
                        <span className={styles.close} onClick={() => removeTag(index)}>
                            &times;
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default TagsInput;
