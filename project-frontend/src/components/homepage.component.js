import React, {Component} from 'react';


export default  class HomePage extends Component {
  render(){
    return(
      <div>
      <br/>
      <br/>
          <h3> Welcome to Name Encoder </h3>
          <br/><h4>Name matching in Ireland</h4><br/>

<p>Names of individuals used in documents created in the 19th century were written at a time when spelling was not standardized, handwriting could be difficult to read, contractions were used and many people were illiterate and so dictated their names to whoever was writing them down. This is a common problem in genealogy and various solutions have been found. One of these is using Look-up tables.</p>
<br/>
<h4>Look-up tables:</h4><br/>

<p> Irish surnames are a mixture of various influences reflecting the country’s history. In 1841, the majority used on official documents were either Anglicisations or translations of original Celtic names, using various spellings. Additional names are imports, mainly from Britain. Matheson, the Assistant Registrar-General in Dublin, used the civil registers in 1894 to produce a survey of names classified by original language, distribution and frequency . In 1901, he developed this into a full classification system with the aim of helping in searches of the register indexes . He illustrates the problem with examples collected from registry offices, where many of members of close families used different forms of their surnames (for example, a man called Smith registered as dead by his son using the name O’Gowan – an Anglicisation of the Irish for Smith). He used this information to classify the surnames of Ireland into 2091 groups of alternate forms of the same name .</p><p> For example, group 1897 consists of Smith, Smyth, Smythe, Smeeth, Gowan, O’Gowan, MacGowan, McGowan, M’Gowan, Goan, Going, Gow, and Magough, However, his classification is far from complete and also includes multiple mapping between names (that is, the same name can occur in more than one group).
</p>
<h4>Name encoding</h4><br/>
<p>
The main purpose of this project was to see how well each substitute reveals the same information as the census. The main method is to match individuals in each. This is done through matching names. Because of the nature of Irish surnames, a method can be used to do this semi-automatically using look-up tables.

The method uses a look-up table based on that developed by Matheson to match names . The reason for using this is that he deals with translations and anglicisations that other matching techniques including Soundex do not. Matheson’s index to his groupings is available as a text file derived by OCR software. This was downloaded and cleaned of obvious mis-recognised characters. This was then loaded into an excel spreadsheet. Matheson has several alternative mappings for some surname variants. It was decided to combine some of these into larger groups. Each surname group is indexed by a four digit number. For example, Hanlon, O’Hanlon and Hanlin are all represented by 0606.

Matheson does not cover all surnames. Therefore, the list of surnames from each source was run through the indexing algorithm and those that were not already included were identified. Two standard texts, by MacLysaght  and de Bhulbh , were consulted to see if each of these names were a variant of an existing group and, if so, they were added appropriately. The remainder were each given a new group number along with any variants listed in the standard texts. The list as finally used included almost 11,841 surnames in 2,311 groups.

First names are often contracted in written documents. To match names such as Patrick with all possible variants (Pat, Patt, Patk, Paddy, etc.), a look-up scheme similar to that for surnames was adopted. This was based on the first name variants used by the Irish Family History Foundation on the RootsIreland website .  For example, the index value for Patrick and its variants is 94. As with surnames, each data source was indexed on first names and any missing variants identified. These were then manually added to the index table in most cases to an existing group. The final table included 4285 first name spellings arranged in 201 groups. A Soundex encoding for first names was considered but rejected as being less reliable.
</p>

<h4>How Does the Name Encoding Work?</h4><br/>
<p>
For each person’s name therefore two encodings were derived:<br/>
<ul>
<li>surname-index (sindex)</li>
<li>first-name-index (findex)</li>
</ul>
To encode the whole name, the index codes for surname and first-name were combined into a 7 digit number (nindex = sindex *1000+findex).<br/>
For example, Patrick Hanlon in Griffith Valuation is represented as 0606094.<br/>
The signature Patk O’Hanlon on the Morpeth Roll produces the same code, as does Patt Hanlon and Paddy Hanlin. This scheme also has the potential for partial matching as the range 0606000 to 0606999 represent all the Hanlon variants whatever the first name.
</p>
      </div>



    )
  }
}
