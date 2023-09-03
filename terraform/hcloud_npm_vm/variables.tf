variable "hcloud_token" {
  description = "The API token for Hetzner Cloud."
  type        = string
}

variable "hcloud_ssh_key" {
  description = "Path to the SSH public key."
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "hcloud_ssh_key_private" {
  description = "Path to the SSH public key."
  type        = string
  default     = "~/.ssh/id_rsa"
}

variable "domain_name" {
  description = "Domain name for Jenkins server."
  type        = string
}

variable "cloudflare_api_token" {
  description = "The API token for Cloudflare."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "The Zone ID of your domain in Cloudflare."
  type        = string
}