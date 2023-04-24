async function updateObjectInArray<ObjectShape>(
    initialArray: ObjectShape[],
    key: keyof ObjectShape,
    value: ObjectShape[keyof ObjectShape],
    patch: Partial<ObjectShape>
): Promise<ObjectShape[]> {

    const newArray = [...initialArray];

    const index = newArray.findIndex((obj) => obj[key] === value);

    if (index !== -1) {
        newArray[index] = { ...newArray[index], ...patch };
    }

    return newArray;
}