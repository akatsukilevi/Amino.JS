const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints');
const {
    getConfig
} = require('../index');

/**
 * A Function that deletes Wiki Entries
 * @param {CommunityID} com A ID that can be obtained by the function getJoinedComs
 * @param {WikiID} uid An ID for a Wiki Entry
 * @returns {Boolean} If the Wiki Entry was successfully deleted.
 */
module.exports = async function deleteWikiEntry(com, uid) {
    let sid = getConfig('sid');
    if(typeof sid != 'string') {
        throw new Error('SID is not Defined. Please Login first!');
    }
    if(typeof com != 'string' || typeof uid != 'string') {
        throw new Error('Not all Arguments are given.');
    }
    const res = await fetch(endpoints.deleteWiki(com, uid), {
        method: 'DELETE',
        headers: {
            NDCAUTH: `sid=${sid}`
        }
    });
    if(!res.ok) throw new Error('An Error occured!' + res.status);
    return res.ok;
};