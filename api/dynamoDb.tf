resource "aws_dynamodb_table" "setback_events_table" { 
   name = "setback-events"  
   billing_mode = "PROVISIONED" 
   read_capacity = "30" 
   write_capacity = "30" 
   attribute { 
      name = "id" 
      type = "S" 
   }
   hash_key = "id" 
   point_in_time_recovery { enabled = true } 
   server_side_encryption { enabled = true } 
   lifecycle { ignore_changes = [ write_capacity, read_capacity ] }
}