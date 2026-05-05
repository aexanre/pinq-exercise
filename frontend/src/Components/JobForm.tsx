import { useState } from "react";
import { createJob } from "../api";

export default function JobForm({ onCreated }: any) {
    const [name, setName] = useState("");
    const [operation, setOperation] = useState("sum");
    
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let input;
        if (operation === "sum" || operation === "multiply") {
            input = [Number(value1), Number(value2)];
        } else {
            input = text;
        }

        const job = {
            name,
            operation,
            input
        };
        await createJob(job);
        onCreated();
        // reset
        setName("");
        setValue1("");
        setValue2("");
        setText("");
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Job Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <select value={operation} onChange={e => setOperation(e.target.value)}>
                <option value="sum">Sum</option>     
                <option value="multiply">Multiply</option>
                <option value="reverse_string">Reverse String</option>
                <option value="count_words">Count Words</option>
            </select>

            {/* Render input fields based on selected operation */}
            {(operation === "sum" || operation === "multiply") && (
                <div>
                    <input
                        type="number"
                        placeholder="value 1"
                        value={value1}
                        onChange={e => setValue1(e.target.value)}
                    />
                    <p>{operation === "sum" ? "+" : "*"}</p>
                    <input
                        type="number"
                        placeholder="value 2"
                        value={value2}
                        onChange={e => setValue2(e.target.value)}
                    />
                </div>
            )}

            {(operation === "reverse_string" || operation === "count_words") && (
                <input
                    placeholder="Enter text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            )}
            
            <button type="submit">Create Job</button>
        </form>
    );
}