const apiKey = "OPENAI KEY"
const submitIcon = document.querySelector("#submit-button")
const input_element = document.querySelector("input")
const imageSection = document.querySelector(".images-section");

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            prompt: input_element.value,
            n:4,
            size: "1024x1024"
        })
    }
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations", options)
        const data = await response.json()
        console.log(data)

        data?.data.forEach(imageObject => {
            const image_Container =  document.createElement("div")
            image_Container.classList.add("image-container")
            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", imageObject.url)
            image_Container.append(imageElement)
            imageSection.append(image_Container)
        });

    } catch(error){
        console.error(error)
    }
}


submitIcon.addEventListener("click", getImages)