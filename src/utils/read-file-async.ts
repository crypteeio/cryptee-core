export const readFileAsync = (file: File) => {
    const fileReader = new FileReader();
  
    return new Promise((resolve: (value: number[]) => void, reject) => {
        fileReader.onerror = () => {
        fileReader.abort();
        reject(new Error("Problem parsing input file."));
      };
  
      fileReader.onload = () => {
        const result = Array.from(new Uint8Array(fileReader.result as ArrayBuffer))         
        resolve(result);
        return result
      };
      fileReader.readAsArrayBuffer(file);
    });
  };