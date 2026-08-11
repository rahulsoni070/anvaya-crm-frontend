import { useState, useRef, useEffect } from "react";
import "../styles/TagsMultiSelect.css";

function TagsMultiSelect({ availableTags, selectedTags, onToggleTag, onAddTag }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newTagInput, setNewTagInput] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddClick = () => {
        const trimmed = newTagInput.trim();

        if (trimmed) {
            onAddTag(trimmed);
            setNewTagInput("");
        }
    };

    return (
        <div className="tags-multiselect" ref={wrapperRef}>
            <button
                type="button"
                className="tags-multiselect-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="tags-multiselect-trigger-text">
                    {selectedTags.length > 0
                        ? selectedTags.join(", ")
                        : "Select Tags"}
                </span>
                <span className="tags-multiselect-arrow">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {isOpen && (
                <div className="tags-multiselect-panel">
                    <div className="tags-multiselect-options">
                        {availableTags.length === 0 && (
                            <p className="tags-multiselect-empty">
                                No tags yet
                            </p>
                        )}

                        {availableTags.map((tag) => (
                            <label
                                key={tag}
                                className="tags-multiselect-option"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => onToggleTag(tag)}
                                />
                                {tag}
                            </label>
                        ))}
                    </div>

                    <div className="tags-multiselect-add">
                        <input
                            type="text"
                            value={newTagInput}
                            onChange={(event) =>
                                setNewTagInput(event.target.value)
                            }
                            placeholder="Add a new tag"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleAddClick();
                                }
                            }}
                        />
                        <button type="button" onClick={handleAddClick}>
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TagsMultiSelect;