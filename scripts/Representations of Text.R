library(tidyverse)
library(tidytext)
library(SnowballC)



matthew_df <- newtest_df %>%
  filter(book_title == "Matthew")

# TF-IDF ----
# Text Frequency - Inverse Document Frequency
## Allows us to compare token importance across documents
### Higher values = the token is important in that document

# In this case, each verse is a "document"
matthew_df %>%
  unnest_tokens(output = "word",
                token = "words",
                input = text) %>%
  anti_join(stop_words) %>%
  count(verse_title, word, sort = TRUE) %>%

  tidytext::bind_tf_idf(term = word, document = verse_title, n) %>%

  filter(verse_title == "Matthew 19:12")