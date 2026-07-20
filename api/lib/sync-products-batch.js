export async function syncProductsBatch(offset = 0) {

    return {

        success: true,

        processed: 0,

        nextOffset: offset,

        finished: true

    };

}