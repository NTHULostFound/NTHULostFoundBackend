import pg from '../database'

/* eslint-disable no-unused-vars */
export default class ItemsModel {
  static async getItems (pagingArgs, itemType, showResolved = false, authorId = null, searchList = null) {
    const { first, last, after, before } = pagingArgs

    try {
      let items
      let hasNextPage
      let hasPreviousPage

      const builder = pg('items').select('*')

      if (itemType) { builder.where('type', itemType) }

      if (!showResolved) { builder.where('resolved', false) }

      if (authorId) { builder.where('author', authorId) }

      if (searchList) {
        builder.where((bd) => {
          let res = bd
          for (const search of searchList) {
            res = res.orWhereRaw("?? ILIKE '%' || ? || '%'", ['name', search])
              .orWhereRaw("?? ILIKE '%' || ? || '%'", ['description', search])
              .orWhereRaw("?? ILIKE '%' || ? || '%'", ['place', search])
          }
          return res
        })
      }

      if (first && !after && !before) {
        const data = await builder
          .orderBy('createdAt', 'DESC')
          .limit(first + 1)

        hasPreviousPage = false
        hasNextPage = data.length > first
        items = hasNextPage ? data.slice(0, -1) : data
      } else if (first && after) {
        const data = await builder
          .where('createdAt', '<', ItemsModel.decodeCursor(after))
          .orderBy('createdAt', 'DESC')
          .limit(first + 1)

        hasPreviousPage = true
        hasNextPage = data.length > first
        items = hasNextPage ? data.slice(0, -1) : data
      } else if (last && !before && !after) {
        const subQuery = builder
          .orderBy('createdAt', 'ASC')
          .limit(last + 1)

        const data = await pg
          .from(pg.raw(`(${subQuery}) AS items`))
          .orderBy('items.createdAt', 'DESC')

        hasNextPage = false
        hasPreviousPage = data.length > last
        items = hasPreviousPage ? data.slice(1) : data
      } else if (last && before) {
        const subQuery = builder
          .where('createdAt', '>', ItemsModel.decodeCursor(before))
          .orderBy('createdAt', 'ASC')
          .limit(last + 1)

        const data = await pg
          .from(pg.raw(`(${subQuery}) AS items`))
          .orderBy('items.createdAt', 'DESC')

        hasNextPage = true
        hasPreviousPage = data.length > last
        items = hasPreviousPage ? data.slice(1) : data
      }

      return {
        edges: items,
        pageInfo: {
          hasNextPage,
          hasPreviousPage
        }
      }
    } catch (e) {
      console.warn(e)
      throw Error('Internal Server Error')
    }
  }

  static async getItem (itemId) {
    try {
      const res = await pg('items').select('*').where('uuid', itemId).first()
      return res
    } catch (e) {
      console.warn(e)
      throw Error('Internal Server Error')
    }
  }

  static async newItem (item, authorId) {
    try {
      const res = await pg('items').insert({
        author: authorId,
        type: item.type,
        name: item.name,
        description: item.description,
        date: item.date,
        place: item.place,
        how: item.how,
        contact: item.contact,
        images: item.images_txt
      }).returning('*')

      return res[0]
    } catch (e) {
      console.warn(e)
      throw Error('Internal Server Error')
    }
  }

  static async setResolved (itemId) {
    try {
      const res = await pg('items').update({
        resolved: true
      }).where('uuid', itemId).returning('*')

      return res[0]
    } catch (e) {
      console.warn(e)
      throw Error('Internal Server Error')
    }
  }

  static decodeCursor (cursor) {
    return Buffer.from(cursor, 'base64').toString('ascii')
  }

  static encodeCursor (createdAt) {
    return Buffer.from(createdAt.toISOString()).toString('base64')
  }
}
