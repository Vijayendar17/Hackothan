async function runimage(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: `Bearer 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`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: data }),
            }
        );

        if (!response.ok) {
            const errorDetails = await response.text(); 
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorDetails}`);
        }

        const result = await response.blob(); 
        const imageUrl = URL.createObjectURL(result);
        console.log('Image URL:', imageUrl);
        return imageUrl; 
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export default runimage;
