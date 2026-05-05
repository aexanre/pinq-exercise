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
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    
                    <h2 className="mb-3">Create Job</h2>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="mb-3">
                            <label className="form-label">Job Name</label>
                            <input
                                className="form-control"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Operation</label>
                            <select
                                className="form-select"
                                value={operation}
                                onChange={e => setOperation(e.target.value)}
                            >
                                <option value="sum">Sum</option>
                                <option value="multiply">Multiply</option>
                                <option value="reverse_string">Reverse String</option>
                                <option value="count_words">Count Words</option>
                            </select>
                        </div>

                        {/* Render input fields based on selected operation */}
                        {(operation === "sum" || operation === "multiply") && (
                            <div className="row mb-3 align-items-center g-2">

                                <div className="col">
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Value 1"
                                        value={value1}
                                        onChange={e => setValue1(e.target.value)}
                                    />
                                </div>

                                <div className="col-auto text-center fs-5">
                                    {operation === "sum" ? "+" : "×"}
                                </div>

                                <div className="col">
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="Value 2"
                                        value={value2}
                                        onChange={e => setValue2(e.target.value)}
                                    />
                                </div>

                            </div>
                        )}

                        {(operation === "reverse_string" || operation === "count_words") && (
                            <div className="mb-3">
                                <label className="form-label">Input text</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter text"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                            </div>
                        )}
                        
                        <button type="submit" className="btn btn-primary">Create Job</button>
                    </form>
                </div>
            </div>
        </div>
    );
}