const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {

    const { Books } = this.entities()
    this.after('CREATE', async (book, req) => {

        console.log(book)
        const dbClass = require("sap-hdbext-promisfied")
        var client = await dbClass.createConnectionFromEnv()
        let db = new dbClass(client)

        const statement = await db.preparePromisified(
            `INSERT INTO "MY_BOOKSHOP_BOOKS" ("ID", "TITLE", "STOCK") VALUES (?,?,?)`
        )

        await db.statementExecPromisified(statement, [10, 'My Exit', book.stock])


    })
})