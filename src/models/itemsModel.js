import { UserInputError } from 'apollo-server-express';
import knex from 'knex'
import pg from '../database'

/* eslint-disable no-unused-vars */
export default class ItemsModel {

  static async getItems(pagingArgs, showResolved = false, authorId = null, search = null) {
    const { first, last, after, before } = args;

    try {

      if (!first && !last)
        throw UserInputError("Paging arguments must have either 'first' or 'last'")

      if (first && last)
        throw UserInputError("Paging arguments should not have both 'first' and 'last'")

      if (after && before)
        throw UserInputError("Paging arguments should not have both 'after' and 'before'")

      let items;
      let hasNextPage;
      let hasPreviousPage;

      const builder = knex("items").select("*")

      if (!showResolved)
        builder.where("resolved", false)

      if (authorId)
        builder.where("author", authorId)      

      if (search)
        builder.where((bd) => {
          bd.orWhereRaw("?? ILIKE '%' || ? || '%'", ['name', search])
            .orWhereRaw("?? ILIKE '%' || ? || '%'", ['description', search])
            .orWhereRaw("?? ILIKE '%' || ? || '%'", ['place', search])
        });
      
      if (first && !after && !before) {
        const data = await builder
          .orderBy("createdAt", "DESC")
          .limit(first + 1);

        hasPreviousPage = false;
        hasNextPage = data.length > first;
        items = hasNextPage ? data.slice(0, -1) : data;
      } else if (first && after) {
        const data = await builder
          .where('createdAt', '<', decodeCursor(after))
          .orderBy("createdAt", "DESC")
          .limit(first + 1);

        hasPreviousPage = true;
        hasNextPage = data.length > first;
        items = hasNextPage ? data.slice(0, -1) : data;
      } else if (last && !before && !after) {
        const subQuery = builder
          .orderBy('createdAt', 'ASC')
          .limit(last + 1);

        const data = await knex
          .from(knex.raw(`(${subQuery}) AS items`))
          .orderBy('items.createdAt', 'DESC');

        hasNextPage = false;
        hasPreviousPage = data.length > last;
        items = hasPreviousPage ? data.slice(1) : data;
      } else if (last && before) {
        const subQuery = builder
          .where('createdAt', '>', decodeCursor(before))
          .orderBy('createdAt', 'ASC')
          .limit(last + 1);

        const data = await knex
          .from(knex.raw(`(${subQuery}) AS items`))
          .orderBy('items.createdAt', 'DESC');

        hasNextPage = true;
        hasPreviousPage = data.length > last;
        items = hasPreviousPage ? data.slice(1) : data;
      }

      return {
        edges: items,
        pageInfo: {
          hasNextPage,
          hasPreviousPage
        }
      };

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async getItem(itemId) {
    try {
      const queryText = 'SELECT * FROM items WHERE uuid = $1'
      const itemRes = await pool.query(queryText, [itemId])
      
      const res = knex('items').select('*').where('uuid', itemId).first()
      return res

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async newItem(item) {
    try {

      const res = knex('items').insert({
        type: item.type,
        name: item.name,
        description: item.description,
        date: item.date,
        place: item.place,
        how: item.how,
        contact: item.contact,
        images: item.images_txt
      }).returning('*').first()

      return res

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async setResolved(itemId) {
    try {
      const res = knex('items').update({
        resolved: true
      }).where('uuid', itemId).returning('*').first()

      return res

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }
}
