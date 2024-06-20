CREATE OR REPLACE FUNCTION smart_search (query_string TEXT)
RETURNS JSONB AS $$
BEGIN
    RETURN (
        WITH search_words AS (
    SELECT unnest(
        string_to_array(
            REGEXP_REPLACE(
                query_string, -- input query string
                '(\s(in|or|and)\s)', -- remove conjunctions ( in / and / or )
                ' ',
                'g'
            ), 
            ' ' -- split the entire string into words by spaces
        )
    ) AS word -- treat every substring as a word
), matched_entities AS (

    SELECT -- extract data from entities into json object
        'city' AS entity_type, 
        jsonb_build_object('id', c.id, 'name', c.name) AS entity
    FROM 
        cities c 
    JOIN 
        search_words sw 
    ON 
        c.name ILIKE '%' || sw.word || '%' -- case insensitive match
    WHERE 
        c.name IS NOT NULL  -- Filter out null names

    UNION

    SELECT
        'brand' AS entity_type, 
        jsonb_build_object('id', b.id, 'name', b.name) AS entity
    FROM 
        brands b 
    JOIN 
        search_words sw 
    ON 
        b.name ILIKE '%' || sw.word || '%'
    WHERE 
        b.name IS NOT NULL

    UNION

    SELECT
        'dish_type' AS entity_type, 
        jsonb_build_object('id', dt.id, 'name', dt.name) AS entity
    FROM 
        dish_types dt 
    JOIN 
        search_words sw 
    ON 
        dt.name ILIKE '%' || sw.word || '%'
    WHERE 
        dt.name IS NOT NULL

    UNION

    SELECT
        'diet' AS entity_type, 
        jsonb_build_object('id', d.id, 'name', d.name) AS entity
    FROM 
        diets d 
    JOIN 
        search_words sw 
    ON 
        d.name ILIKE '%' || sw.word || '%'
    WHERE 
        d.name IS NOT NULL
    )
    SELECT json_agg(
                jsonb_build_object(entity_type, entity) 
                ORDER BY entity_type) 
    AS result
    FROM matched_entities
    );
END;
$$ LANGUAGE plpgsql;